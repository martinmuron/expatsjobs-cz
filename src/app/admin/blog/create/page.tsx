'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Search, 
  Tag,
  Clock,
  X
} from 'lucide-react';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
  categories: string[];
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export default function CreateBlogPostPage() {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    status: 'draft',
    categories: [],
    tags: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: ''
  });

  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const availableCategories = [
    'Job Market Trends', 'Career Advice', 'Technology', 'Living in Prague', 
    'Visa & Legal', 'Networking', 'Career Planning', 'Language Learning',
    'Immigration', 'Career Development'
  ];

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (title: string) => {
    setBlogPost(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      metaTitle: title,
      ogTitle: title,
      twitterTitle: title
    }));
  };

  const handleExcerptChange = (excerpt: string) => {
    setBlogPost(prev => ({
      ...prev,
      excerpt,
      metaDescription: excerpt.substring(0, 155),
      ogDescription: excerpt.substring(0, 155),
      twitterDescription: excerpt.substring(0, 155)
    }));
  };

  const addCategory = (category: string) => {
    if (category && !blogPost.categories.includes(category)) {
      setBlogPost(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setBlogPost(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !blogPost.tags.includes(tag)) {
      setBlogPost(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setBlogPost(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSave = (status: 'draft' | 'published') => {
    const postToSave = { ...blogPost, status };
    console.log('Saving blog post:', postToSave);
    // Here you would typically save to your database
    alert(`Blog post ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
  };

  const estimatedReadingTime = Math.ceil(blogPost.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-gray-600">Write and publish engaging content for your audience</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => handleSave('draft')}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave('published')} className="bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={blogPost.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter an engaging blog post title..."
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={blogPost.slug}
                    onChange={(e) => setBlogPost(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="auto-generated-from-title"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URL: expatsjobs.cz/blog/{blogPost.slug || 'your-slug-here'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={blogPost.excerpt}
                    onChange={(e) => handleExcerptChange(e.target.value)}
                    placeholder="Write a compelling excerpt that summarizes your post..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {blogPost.excerpt.length}/300 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={blogPost.content}
                    onChange={(e) => setBlogPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your blog post content here. You can use HTML tags for formatting..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{blogPost.content.split(' ').length} words</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      ~{estimatedReadingTime} min read
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  SEO Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={blogPost.metaTitle}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="SEO-optimized title for search engines"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {blogPost.metaTitle.length}/60 characters
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={blogPost.metaDescription}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="Brief description for search engine results"
                        rows={3}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {blogPost.metaDescription.length}/155 characters
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="metaKeywords">Keywords</Label>
                      <Input
                        id="metaKeywords"
                        value={blogPost.metaKeywords}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, metaKeywords: e.target.value }))}
                        placeholder="SEO keywords separated by commas"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Open Graph (Facebook/LinkedIn)</h4>
                      <div>
                        <Label htmlFor="ogTitle">OG Title</Label>
                        <Input
                          id="ogTitle"
                          value={blogPost.ogTitle}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, ogTitle: e.target.value }))}
                          placeholder="Title for social media shares"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ogDescription">OG Description</Label>
                        <Textarea
                          id="ogDescription"
                          value={blogPost.ogDescription}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, ogDescription: e.target.value }))}
                          placeholder="Description for social media shares"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ogImage">OG Image URL</Label>
                        <Input
                          id="ogImage"
                          value={blogPost.ogImage}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, ogImage: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Twitter Card</h4>
                      <div>
                        <Label htmlFor="twitterTitle">Twitter Title</Label>
                        <Input
                          id="twitterTitle"
                          value={blogPost.twitterTitle}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, twitterTitle: e.target.value }))}
                          placeholder="Title for Twitter shares"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitterDescription">Twitter Description</Label>
                        <Textarea
                          id="twitterDescription"
                          value={blogPost.twitterDescription}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, twitterDescription: e.target.value }))}
                          placeholder="Description for Twitter shares"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitterImage">Twitter Image URL</Label>
                        <Input
                          id="twitterImage"
                          value={blogPost.twitterImage}
                          onChange={(e) => setBlogPost(prev => ({ ...prev, twitterImage: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="canonicalUrl">Canonical URL</Label>
                      <Input
                        id="canonicalUrl"
                        value={blogPost.canonicalUrl}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                        placeholder="https://expatsjobs.cz/blog/your-post-slug"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Leave empty to use default URL
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Status */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={blogPost.status}
                    onValueChange={(value: 'draft' | 'published' | 'archived') => 
                      setBlogPost(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={blogPost.featuredImage}
                    onChange={(e) => setBlogPost(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {blogPost.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeCategory(category)}
                      />
                    </Badge>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="newCategory">Add Category</Label>
                  <div className="flex gap-2">
                    <Select value={newCategory} onValueChange={setNewCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories
                          .filter(cat => !blogPost.categories.includes(cat))
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => addCategory(newCategory)}
                      disabled={!newCategory}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      #{tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="newTag">Add Tag</Label>
                  <div className="flex gap-2">
                    <Input
                      id="newTag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter tag name"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(newTag);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => addTag(newTag)}
                      disabled={!newTag}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Preview */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="text-sm text-green-600 mb-1">
                    expatsjobs.cz/blog/{blogPost.slug || 'your-slug-here'}
                  </div>
                  <div className="text-blue-600 text-lg mb-1 line-clamp-2">
                    {blogPost.metaTitle || blogPost.title || 'Your Blog Post Title'}
                  </div>
                  <div className="text-gray-600 text-sm line-clamp-2">
                    {blogPost.metaDescription || blogPost.excerpt || 'Your blog post description will appear here...'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}