using System.Collections.Generic;

namespace Platformer.Core
{
    public static partial class Simulation
    {
        /// <summary>
        /// An event is something that happens at a point in time in a simulation.
        /// The Precondition method is used to check if the event should be executed,
        /// as conditions may have changed in the simulation since the event was 
        /// originally scheduled.
        /// </summary>
        /// <typeparam name="Event"></typeparam>
        public abstract class Event : System.IComparable<Event>
        {
            internal float tick;

            public int CompareTo(Event other)
            {
                return tick.CompareTo(other.tick);
            }

            public abstract void Execute();

            public virtual bool Precondition() => true;

            internal virtual void ExecuteEvent()
            {
                if (Precondition())
                    Execute();
            }

            /// <summary>
            /// This method is generally used to set references to null when required.
            /// It is automatically called by the Simulation when an event has completed.
            /// </summary>
            internal virtual void Cleanup()
            {

            }
        }

        /// <summary>
        /// Event<T> adds the ability to hook into the OnExecute callback
        /// whenever the event is executed. Use this class to allow functionality
        /// to be plugged into your application with minimal or zero configuration.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public abstract class Event<T> : Event where T : Event<T>
        {
            public static System.Action<T> OnExecute;

            internal override void ExecuteEvent()
            {
                if (Precondition())
                {
                    Execute();
                    OnExecute?.Invoke((T)this);
                }
            }
        }
    }
}