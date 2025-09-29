'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import type { EditableResumeData } from '@/types/resume'

interface EditableResumeFormProps {
  data: EditableResumeData
  onChange: (data: EditableResumeData) => void
}

export function EditableResumeForm({ data, onChange }: EditableResumeFormProps) {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    })
  }

  const updateSummary = (summary: string) => {
    onChange({ ...data, summary })
  }

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      period: '',
      location: '',
      description: [''],
    }
    onChange({
      ...data,
      experience: [...data.experience, newExp],
    })
  }

  const updateExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const addProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: [],
      achievements: [''],
    }
    onChange({
      ...data,
      projects: [...data.projects, newProject],
    })
  }

  const updateProject = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your contact details and basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={data.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone || ''}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={data.personalInfo.location || ''}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
              <Input
                id="linkedin"
                value={data.personalInfo.linkedin || ''}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub (Optional)</Label>
              <Input
                id="github"
                value={data.personalInfo.github || ''}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>A brief overview of your professional background</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows={4}
            placeholder="Write a compelling professional summary..."
          />
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Professional Experience</CardTitle>
              <CardDescription>Your work history and achievements</CardDescription>
            </div>
            <Button onClick={addExperience} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Experience {index + 1}</span>
                </div>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Period</Label>
                  <Input
                    value={exp.period}
                    onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                    placeholder="e.g., Jan 2023 - Present"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Job Description</Label>
                <Textarea
                  value={exp.description.join('\n')}
                  onChange={(e) =>
                    updateExperience(exp.id, 'description', e.target.value.split('\n'))
                  }
                  rows={4}
                  placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Key Projects</CardTitle>
              <CardDescription>Notable projects and their impact</CardDescription>
            </div>
            <Button onClick={addProject} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={project.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Project {index + 1}</span>
                </div>
                <Button
                  onClick={() => removeProject(project.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label>Technologies</Label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      'technologies',
                      e.target.value.split(', ').filter(Boolean)
                    )
                  }
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>
              <div>
                <Label>Key Achievements</Label>
                <Textarea
                  value={project.achievements.join('\n')}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      'achievements',
                      e.target.value.split('\n').filter(Boolean)
                    )
                  }
                  rows={3}
                  placeholder="• Achievement 1&#10;• Achievement 2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Technical Skills</Label>
            <Textarea
              value={data.skills.technical.join(', ')}
              onChange={(e) =>
                onChange({
                  ...data,
                  skills: {
                    ...data.skills,
                    technical: e.target.value.split(', ').filter(Boolean),
                  },
                })
              }
              rows={3}
              placeholder="JavaScript, React, Node.js, Python, AWS"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
