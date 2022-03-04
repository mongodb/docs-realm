class Task {
   ObjectId id;
   string name;
   bool isComplete;
   string? assignee;
   int priority;
   int progressMinutes;
}

class Project {
   ObjectId id;
   string name;
   Task[] tasks;
   int? quota;
}