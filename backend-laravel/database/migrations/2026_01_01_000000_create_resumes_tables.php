<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Resumes Master Table
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->string('uuid', 64)->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name')->default('Untitled Resume');
            $table->string('target_role')->nullable();
            $table->text('summary')->nullable();
            $table->string('template', 64)->default('executive');
            $table->string('accent_color', 32)->default('#059669');
            $table->string('font_family', 32)->default('sans');
            $table->string('font_size', 32)->default('medium');
            $table->boolean('compact_spacing')->default(false);
            $table->string('page_margin', 32)->default('normal');
            $table->boolean('show_projects')->default(true);
            $table->boolean('show_certifications')->default(true);
            $table->boolean('show_languages')->default(true);
            $table->boolean('show_references')->default(false);
            $table->text('references_text')->nullable();
            $table->json('raw_json_data')->nullable();
            $table->timestamps();

            $table->index('uuid');
            $table->index('user_id');
        });

        // 2. Personal Info
        Schema::create('personal_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('full_name')->default('');
            $table->string('title')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 64)->nullable();
            $table->string('location')->nullable();
            $table->string('portfolio_url', 512)->nullable();
            $table->string('linkedin_url', 512)->nullable();
            $table->string('github_url', 512)->nullable();
            $table->string('twitter_url', 512)->nullable();
            $table->timestamps();

            $table->unique('resume_id');
        });

        // 3. Work Experiences
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('role');
            $table->string('company');
            $table->string('location')->nullable();
            $table->string('startDate', 64);
            $table->string('endDate', 64);
            $table->boolean('is_current')->default(false);
            $table->json('description_bullets')->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();

            $table->index('resume_id');
        });

        // 4. Educations
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('degree');
            $table->string('institution');
            $table->string('location')->nullable();
            $table->string('startDate', 64);
            $table->string('endDate', 64);
            $table->string('gpa_or_grade', 64)->nullable();
            $table->json('coursework_bullets')->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();

            $table->index('resume_id');
        });

        // 5. Skill Categories
        Schema::create('skill_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('category_name');
            $table->json('skills_list')->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();

            $table->index('resume_id');
        });

        // 6. Projects
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('title');
            $table->string('role_or_tech')->nullable();
            $table->string('link', 512)->nullable();
            $table->json('bullets')->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();

            $table->index('resume_id');
        });

        // 7. Certifications
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('name');
            $table->string('issuer');
            $table->string('issue_date', 64)->nullable();
            $table->string('credential_url', 512)->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();

            $table->index('resume_id');
        });

        // 8. Languages
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resume_id')->constrained('resumes')->cascadeOnDelete();
            $table->string('language', 128);
            $table->string('proficiency', 128);
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();

            $table->index('resume_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('languages');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('skill_categories');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('personal_infos');
        Schema::dropIfExists('resumes');
    }
};
