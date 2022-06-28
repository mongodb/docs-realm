.. important:: Severless Limitations

  You cannot watch for changes if the data source is an Atlas serverless instance. 
  {+atlas+} serverless currently does not support change streams, which are used on watched
  collections to listen for changes.
