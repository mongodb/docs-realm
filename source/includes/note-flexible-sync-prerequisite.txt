.. note:: Flexible Sync Prerequisites

   Enabling Flexible Sync in Your {+service-short+} Application requires the following: 
   
   - A non-sharded {+atlas+} cluster running :manual:`MongoDB 5.0 or greater </release-notes/>`
   - A {+app+} without Partition-Based Sync enabled. While Flexible Sync is in preview, you cannot use Flexible Sync & Partition-Based Sync in the same {+app+}.