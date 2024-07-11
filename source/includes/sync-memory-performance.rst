Every write transaction for a subscription set has a performance cost. If you 
need to make multiple updates to an SDK object during a session, consider
keeping edited objects in memory until all changes are complete. This 
improves sync performance by only writing the complete and updated object to
your database instead of every change.
