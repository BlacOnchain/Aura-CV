<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ResumeController extends Controller
{
    /**
     * GET /api/resumes
     * List resumes for the authenticated user
     */
    public function index(Request $request): JsonResponse
    {
        $resumes = Resume::where('user_id', auth()->id())
            ->orderBy('updated_at', 'desc')
            ->get();

        $formatted = $resumes->map(function ($resume) {
            return [
                'id' => $resume->uuid,
                'name' => $resume->name,
                'targetRole' => $resume->target_role ?? '',
                'lastModified' => $resume->updated_at->getTimestamp() * 1000,
                'data' => $resume->toFrontendResumeData(),
            ];
        });

        return response()->json([
            'status' => 'success',
            'count' => $formatted->count(),
            'resumes' => $formatted,
        ]);
    }

    /**
     * POST /api/resumes
     * Create a new resume record
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'data' => 'required|array',
            'targetRole' => 'nullable|string|max:255',
        ]);

        $uuid = (string) Str::uuid();
        $data = $validated['data'];
        $settings = $data['settings'] ?? [];

        $resume = Resume::create([
            'uuid' => $uuid,
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'target_role' => $validated['targetRole'] ?? ($data['personal']['title'] ?? null),
            'summary' => $data['summary'] ?? null,
            'template' => $settings['template'] ?? 'executive',
            'accent_color' => $settings['accentColor'] ?? '#059669',
            'font_family' => $settings['fontFamily'] ?? 'sans',
            'font_size' => $settings['fontSize'] ?? 'medium',
            'compact_spacing' => $settings['compactSpacing'] ?? false,
            'page_margin' => $settings['pageMargin'] ?? 'normal',
            'show_projects' => $settings['showProjects'] ?? true,
            'show_certifications' => $settings['showCertifications'] ?? true,
            'show_languages' => $settings['showLanguages'] ?? true,
            'show_references' => $settings['showReferences'] ?? false,
            'raw_json_data' => $data,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Resume created in MySQL successfully',
            'resume' => [
                'id' => $resume->uuid,
                'name' => $resume->name,
                'targetRole' => $resume->target_role,
                'lastModified' => $resume->updated_at->getTimestamp() * 1000,
                'data' => $resume->toFrontendResumeData(),
            ],
        ], 201);
    }

    /**
     * GET /api/resumes/{uuid}
     */
    public function show(string $uuid): JsonResponse
    {
        $resume = Resume::where('uuid', $uuid)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'resume' => [
                'id' => $resume->uuid,
                'name' => $resume->name,
                'targetRole' => $resume->target_role,
                'lastModified' => $resume->updated_at->getTimestamp() * 1000,
                'data' => $resume->toFrontendResumeData(),
            ],
        ]);
    }

    /**
     * PUT/PATCH /api/resumes/{uuid}
     * Update an existing resume
     */
    public function update(Request $request, string $uuid): JsonResponse
    {
        $resume = Resume::where('uuid', $uuid)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $data = $request->input('data');
        if ($data) {
            $settings = $data['settings'] ?? [];
            $resume->update([
                'name' => $request->input('name', $resume->name),
                'target_role' => $request->input('targetRole', $data['personal']['title'] ?? $resume->target_role),
                'summary' => $data['summary'] ?? $resume->summary,
                'template' => $settings['template'] ?? $resume->template,
                'accent_color' => $settings['accentColor'] ?? $resume->accent_color,
                'font_family' => $settings['fontFamily'] ?? $resume->font_family,
                'font_size' => $settings['fontSize'] ?? $resume->font_size,
                'compact_spacing' => $settings['compactSpacing'] ?? $resume->compact_spacing,
                'page_margin' => $settings['pageMargin'] ?? $resume->page_margin,
                'raw_json_data' => $data,
            ]);
        } else {
            if ($request->has('name')) {
                $resume->name = $request->input('name');
            }
            if ($request->has('targetRole')) {
                $resume->target_role = $request->input('targetRole');
            }
            $resume->save();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Resume updated in MySQL',
            'resume' => [
                'id' => $resume->uuid,
                'name' => $resume->name,
                'targetRole' => $resume->target_role,
                'lastModified' => $resume->updated_at->getTimestamp() * 1000,
                'data' => $resume->toFrontendResumeData(),
            ],
        ]);
    }

    /**
     * DELETE /api/resumes/{uuid}
     */
    public function destroy(string $uuid): JsonResponse
    {
        $resume = Resume::where('uuid', $uuid)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        $resume->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Resume deleted from database',
        ]);
    }

    /**
     * POST /api/resumes/bulk-sync
     * Sync multiple resumes at once
     */
    public function bulkSync(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'resumes' => 'required|array',
            'resumes.*.id' => 'required|string',
            'resumes.*.name' => 'required|string',
            'resumes.*.data' => 'required|array',
        ]);

        $userId = auth()->id();
        $syncedIds = [];

        DB::transaction(function () use ($validated, $userId, &$syncedIds) {
            foreach ($validated['resumes'] as $resumeItem) {
                $uuid = $resumeItem['id'];
                $data = $resumeItem['data'];
                $settings = $data['settings'] ?? [];

                Resume::updateOrCreate(
                    ['uuid' => $uuid, 'user_id' => $userId],
                    [
                        'name' => $resumeItem['name'],
                        'target_role' => $resumeItem['targetRole'] ?? ($data['personal']['title'] ?? null),
                        'summary' => $data['summary'] ?? null,
                        'template' => $settings['template'] ?? 'executive',
                        'accent_color' => $settings['accentColor'] ?? '#059669',
                        'font_family' => $settings['fontFamily'] ?? 'sans',
                        'font_size' => $settings['fontSize'] ?? 'medium',
                        'compact_spacing' => $settings['compactSpacing'] ?? false,
                        'page_margin' => $settings['pageMargin'] ?? 'normal',
                        'raw_json_data' => $data,
                    ]
                );
                $syncedIds[] = $uuid;
            }
        });

        return response()->json([
            'status' => 'success',
            'message' => count($syncedIds) . ' resumes synced',
            'synced_ids' => $syncedIds,
        ]);
    }

    // clearDatabase method removed for security
}
