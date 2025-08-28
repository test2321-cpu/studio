
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import type { Article } from '@/lib/types';
import { createArticle, updateArticle } from '@/services/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  author: z.string().optional(),
  date: z.string().min(1, { message: "Date is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  imageHint: z.string().min(1, { message: "Image hint is required." }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters." }),
});

interface ArticleFormProps {
  article?: Article | null;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!article;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing && article ? {
      ...article,
      author: article.author || ''
    } : {
      title: '',
      slug: '',
      category: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://picsum.photos/800/600',
      imageHint: '',
      excerpt: '',
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing && article) {
        await updateArticle(article.id, values);
        toast({ title: "Success", description: "Article updated successfully." });
      } else {
        await createArticle(values);
        toast({ title: "Success", description: "Article created successfully." });
      }
      router.push('/admin/articles');
      router.refresh();
    } catch (error) {
      console.error("Failed to save article:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save article.",
      });
    }
  };
  
  const categories = ['Latest News', 'Featured', 'Opinion', 'Stories'];

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/admin/articles"><ArrowLeft className="mr-2 h-4 w-4" />Back to Articles</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Article' : 'Create New Article'}</CardTitle>
            <CardDescription>{isEditing ? 'Make changes to the existing article.' : 'Fill out the form to add a new article.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="Article title" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl><Input placeholder="article-title-goes-here" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl><Input placeholder="Author's name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="imageHint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Hint</FormLabel>
                      <FormControl><Input placeholder="e.g. 'cricket player'" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl><Textarea placeholder="A short summary of the article" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl><Textarea placeholder="The full content of the article. You can use HTML for formatting." rows={15} {...field} /></FormControl>
                      <FormDescription>
                        You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, etc. for formatting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Saving...' : (isEditing ? 'Update Article' : 'Create Article')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
