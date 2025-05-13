'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import type { UserProgress, SessionRecord } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Award, BarChart3, CalendarDays, TrendingUp } from 'lucide-react';
import { format } from 'date-fns'; // Using date-fns as allowed for date formatting

interface ProgressDisplayProps {
  progress: UserProgress | null;
}

const ProgressDisplay = ({ progress }: ProgressDisplayProps) => {
  const { translate, language } = useLocalization();

  if (!progress || progress.sessions.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{translate('yourProgress')}</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{translate('noSessionsYet')}</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPp', { locale: language === 'ru' ? require('date-fns/locale/ru') : require('date-fns/locale/en-US') });
    } catch (e) {
      return dateString; // fallback
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translate('longestBreathHold')}</CardTitle>
            <Award className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {progress.longestHoldOverall} {translate('sec')}
            </div>
            <p className="text-xs text-muted-foreground">
              Your personal best
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translate('totalSessions')}</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {progress.totalSessionsCompleted}
            </div>
             <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{translate('sessionsLog')}</CardTitle>
          <CardDescription>Detailed history of your breathing sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]"><CalendarDays className="inline mr-1 h-4 w-4"/>{translate('sessionDate')}</TableHead>
                <TableHead className="text-center">{translate('sessionRounds')}</TableHead>
                <TableHead>{translate('sessionHolds')}</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Longest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.sessions.slice().reverse().map((session: SessionRecord) => ( // Show newest first
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{formatDate(session.date)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{session.rounds}</Badge>
                  </TableCell>
                  <TableCell>
                    {session.holdDurations.join(', ')}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                     <Badge variant="outline" className="text-primary border-primary">
                        {session.longestHold} {translate('sec')}
                     </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDisplay;
