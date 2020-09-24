.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Mode
     - Description

   * - :manual:`primary </reference/read-preference/#primary>`
     - {+service-short+} routes all read operations to the current replica set
       :manual:`primary node </core/replica-set-primary>`. This is the
       default read preference mode.

   * - :manual:`primaryPreferred </reference/read-preference/#primaryPreferred>`
     - {+service-short+} routes all read operations to the current replica set
       :manual:`primary node </core/replica-set-primary>` if it's
       available. If the primary is unavailable, such as during an
       :manual:`automatic failover
       </replication/#automatic-failover>`, read requests are routed
       to a :manual:`secondary node </core/replica-set-secondary>`
       instead.

   * - :manual:`secondary </reference/read-preference/#secondary>`
     - {+service-short+} routes all read operations to one of the current replica
       set :manual:`secondary nodes </core/replica-set-primary>`.

   * - :manual:`secondaryPreferred </reference/read-preference/#secondaryPreferred>`
     - {+service-short+} routes all read operations to one of the replica set's
       available :manual:`secondary nodes
       </core/replica-set-secondary>`. If no secondary is available,
       read requests are routed to the replica set :manual:`primary
       </core/replica-set-primary>` instead.

   * - :manual:`nearest </reference/read-preference/#nearest>`
     - {+service-short+} routes read operations to the :manual:`replica set member
       </core/replica-set-members>` that has the lowest network
       latency relative to the client.
