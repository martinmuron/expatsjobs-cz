import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/lib/mockJobs';
import { MapPin, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-2">{job.title}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Building2 className="h-4 w-4 mr-1" />
              <span className="text-sm">{job.company}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
          <Badge variant={job.jobType === 'full-time' ? 'default' : 'secondary'}>
            {job.jobType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {job.salary && (
            <div className="text-sm font-medium text-primary">
              {job.salary}
            </div>
          )}
          
          <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {job.languages.slice(0, 3).map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
            {job.languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job.languages.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>{new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
            <Button size="sm" asChild>
              <Link href={`/jobs/${job.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}