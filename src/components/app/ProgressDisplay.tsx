'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import type { UserProgress, SessionRecord } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Award, BarChart3, CalendarDays, TrendingUp, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';


interface ProgressDisplayProps {
  progress: UserProgress | null;
  onDeleteSession?: (sessionId: string) => void;
}

const ProgressDisplay = ({ progress, onDeleteSession }: ProgressDisplayProps) => {
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
      return format(parseISO(dateString), 'PPp', { locale: language === 'ru' ? ru : enUS });
    } catch (e) {
      console.error("Error formatting date:", e);
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
                {onDeleteSession && <TableHead className="text-right">{translate('actionColumnHeader')}</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.sessions.slice().reverse().map((session: SessionRecord) => ( 
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
                  {onDeleteSession && (
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={translate('deleteSession')}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{translate('confirmDeleteSessionTitle')}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {translate('confirmDeleteSessionDescription')}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{translate('cancelButton')}</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDeleteSession(session.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              {translate('confirmDeleteButton')}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
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
