<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resume extends Model
{
    use HasFactory;

    protected $table = 'resumes';

    protected $fillable = [
        'uuid',
        'user_id',
        'name',
        'target_role',
        'summary',
        'template',
        'accent_color',
        'font_family',
        'font_size',
        'compact_spacing',
        'page_margin',
        'show_projects',
        'show_certifications',
        'show_languages',
        'show_references',
        'references_text',
        'raw_json_data',
    ];

    protected $casts = [
        'compact_spacing' => 'boolean',
        'show_projects' => 'boolean',
        'show_certifications' => 'boolean',
        'show_languages' => 'boolean',
        'show_references' => 'boolean',
        'raw_json_data' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function personalInfo(): HasOne
    {
        return $this->hasOne(PersonalInfo::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('order_index');
    }

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class)->orderBy('order_index');
    }

    public function skillCategories(): HasMany
    {
        return $this->hasMany(SkillCategory::class)->orderBy('order_index');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class)->orderBy('order_index');
    }

    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class)->orderBy('order_index');
    }

    public function languages(): HasMany
    {
        return $this->hasMany(Language::class)->orderBy('order_index');
    }

    /**
     * Convert model into complete frontend-compatible ResumeData JSON
     */
    public function toFrontendResumeData(): array
    {
        if (!empty($this->raw_json_data)) {
            return $this->raw_json_data;
        }

        return [
            'id' => $this->uuid,
            'title' => $this->name,
            'summary' => $this->summary ?? '',
            'personal' => $this->personalInfo ? [
                'fullName' => $this->personalInfo->full_name,
                'title' => $this->personalInfo->title ?? '',
                'email' => $this->personalInfo->email ?? '',
                'phone' => $this->personalInfo->phone ?? '',
                'location' => $this->personalInfo->location ?? '',
                'portfolioUrl' => $this->personalInfo->portfolio_url ?? '',
                'linkedinUrl' => $this->personalInfo->linkedin_url ?? '',
                'githubUrl' => $this->personalInfo->github_url ?? '',
                'twitterUrl' => $this->personalInfo->twitter_url ?? '',
            ] : (object)[],
            'experiences' => $this->experiences->map(fn($e) => [
                'id' => 'exp-' . $e->id,
                'role' => $e->role,
                'company' => $e->company,
                'location' => $e->location,
                'startDate' => $e->startDate,
                'endDate' => $e->endDate,
                'isCurrent' => $e->is_current,
                'descriptionBullets' => $e->description_bullets ?? [],
            ]),
            'education' => $this->educations->map(fn($ed) => [
                'id' => 'edu-' . $ed->id,
                'degree' => $ed->degree,
                'institution' => $ed->institution,
                'location' => $ed->location,
                'startDate' => $ed->startDate,
                'endDate' => $ed->endDate,
                'gpaOrGrade' => $ed->gpa_or_grade,
                'courseworkBullets' => $ed->coursework_bullets ?? [],
            ]),
            'skillCategories' => $this->skillCategories->map(fn($s) => [
                'id' => 'skill-' . $s->id,
                'categoryName' => $s->category_name,
                'skillsList' => $s->skills_list ?? [],
            ]),
            'projects' => $this->projects->map(fn($p) => [
                'id' => 'proj-' . $p->id,
                'title' => $p->title,
                'roleOrTech' => $p->role_or_tech,
                'link' => $p->link,
                'bullets' => $p->bullets ?? [],
            ]),
            'certifications' => $this->certifications->map(fn($c) => [
                'id' => 'cert-' . $c->id,
                'name' => $c->name,
                'issuer' => $c->issuer,
                'date' => $c->issue_date,
            ]),
            'languages' => $this->languages->map(fn($l) => [
                'id' => 'lang-' . $l->id,
                'language' => $l->language,
                'proficiency' => $l->proficiency,
            ]),
            'settings' => [
                'template' => $this->template,
                'accentColor' => $this->accent_color,
                'fontFamily' => $this->font_family,
                'fontSize' => $this->font_size,
                'compactSpacing' => (bool)$this->compact_spacing,
                'pageMargin' => $this->page_margin,
                'showProjects' => (bool)$this->show_projects,
                'showCertifications' => (bool)$this->show_certifications,
                'showLanguages' => (bool)$this->show_languages,
                'showReferences' => (bool)$this->show_references,
            ]
        ];
    }
}
