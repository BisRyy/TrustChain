import { CheckCircle2, Circle, Clock } from "lucide-react"

interface TimelineEvent {
  status: string
  timestamp: string
  description: string
}

interface TransactionTimelineProps {
  timeline: TimelineEvent[]
}

export function TransactionTimeline({ timeline }: TransactionTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Timeline</h3>
      <div className="space-y-4">
        {timeline.map((event, index) => (
          <div key={index} className="flex gap-4">
            <div className="mt-1">
              {event.status === "Completed" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {event.status === "Pending" && <Clock className="h-4 w-4 text-yellow-500" />}
              {event.status !== "Completed" && event.status !== "Pending" && (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm font-medium">{event.status}</p>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

