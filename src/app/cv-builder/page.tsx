'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, Download, FileText } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

export default function CVBuilderPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([{
    id: '1',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }]);

  const [education, setEducation] = useState<Education[]>([{
    id: '1',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false
  }]);

  const [skills, setSkills] = useState<Skill[]>([{
    id: '1',
    name: '',
    level: 'beginner'
  }]);

  const [isGenerating, setIsGenerating] = useState(false);

  const addExperience = () => {
    const newId = Date.now().toString();
    setExperiences([...experiences, {
      id: newId,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newId = Date.now().toString();
    setEducation([...education, {
      id: newId,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    const newId = Date.now().toString();
    setSkills([...skills, {
      id: newId,
      name: '',
      level: 'beginner'
    }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const generateCV = async () => {
    setIsGenerating(true);
    
    try {
      const cvData = {
        personalInfo,
        experiences,
        education,
        skills
      };

      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cvData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to generate CV. Please try again.');
      }
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('Failed to generate CV. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">CV AI Builder</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a professional CV in minutes. Fill out the form below and we&apos;ll generate a beautifully formatted PDF for you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    placeholder="+420 123 456 789"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    placeholder="Prague, Czech Republic"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    value={personalInfo.linkedIn}
                    onChange={(e) => setPersonalInfo({...personalInfo, linkedIn: e.target.value})}
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={personalInfo.summary}
                  onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                  placeholder="Brief summary of your professional experience and goals..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button onClick={addExperience} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={experience.id} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium text-gray-500">Experience #{index + 1}</h4>
                    {experiences.length > 1 && (
                      <Button
                        onClick={() => removeExperience(experience.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company *</Label>
                      <Input
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position *</Label>
                      <Input
                        value={experience.position}
                        onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <div className="space-y-2">
                        <Input
                          type="month"
                          value={experience.endDate}
                          onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                          disabled={experience.current}
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`current-${experience.id}`}
                            checked={experience.current}
                            onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                          />
                          <Label htmlFor={`current-${experience.id}`} className="text-sm">
                            Currently working here
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Job Description</Label>
                    <Textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id} className="border-l-2 border-green-200 pl-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium text-gray-500">Education #{index + 1}</h4>
                    {education.length > 1 && (
                      <Button
                        onClick={() => removeEducation(edu.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <div className="space-y-2">
                        <Input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`edu-current-${edu.id}`}
                            checked={edu.current}
                            onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                          />
                          <Label htmlFor={`edu-current-${edu.id}`} className="text-sm">
                            Currently studying here
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button onClick={addSkill} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Skill
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="Skill name"
                      className="flex-1"
                    />
                    <Select
                      value={skill.level}
                      onValueChange={(value) => updateSkill(skill.id, 'level', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    {skills.length > 1 && (
                      <Button
                        onClick={() => removeSkill(skill.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate CV Button */}
          <div className="text-center">
            <Button
              onClick={generateCV}
              disabled={isGenerating || !personalInfo.fullName || !personalInfo.email}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                'Generating CV...'
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate & Download CV
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Your CV will be generated as a PDF and downloaded automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}