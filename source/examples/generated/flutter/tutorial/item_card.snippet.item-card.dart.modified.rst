.. code-block:: dart
   :caption: lib/components/item_card.dart
   :emphasize-lines: 27-35, 50-75

   // ...imports

   class ItemCard extends StatelessWidget {
     final ItemViewModel viewModel;
     final Animation<double> animation;

     const ItemCard(this.viewModel, this.animation, {Key? key}) : super(key: key);

     @override
     Widget build(BuildContext context) {
       final realm = Provider.of<Realm>(context);
       void deleteItem() {
         viewModel.delete();
       }

       return FadeTransition(
         key: key ?? ObjectKey(viewModel),
         opacity: animation,
         child: SizeTransition(
           sizeFactor: animation,
           child: AnimatedSwitcher(
             duration: const Duration(milliseconds: 300),
             child: Slidable(
               // endActionPane property and children widgets
               child: Card(
                 child: ListTile(
                   title: Row(
                     children: [
                       Padding(
                         padding: const EdgeInsets.only(right: 8.0),
                         child: _PriorityIndicator(viewModel.priority),
                       ),
                       SizedBox(width: 175, child: Text(viewModel.summary)),
                     ],
                   ),
                   subtitle:
                       Text(viewModel.isComplete ? 'Completed' : 'Incomplete'),
                   leading: _CompleteCheckbox(viewModel),
                 ),
               ),
             ),
           ),
         ),
       );
     }
   }

   // _CompleteCheckbox widget

   class _PriorityIndicator extends StatelessWidget {
     final int? priority;
     const _PriorityIndicator(this.priority, {Key? key}) : super(key: key);

     Widget getIconForPriority(int? priority) {
       if (priority == PriorityLevel.low) {
         return const Icon(Icons.keyboard_arrow_down, color: Colors.blue);
       } else if (priority == PriorityLevel.medium) {
         return const Icon(Icons.circle, color: Colors.grey);
       } else if (priority == PriorityLevel.high) {
         return const Icon(Icons.keyboard_arrow_up, color: Colors.orange);
       } else if (priority == PriorityLevel.severe) {
         return const Icon(
           Icons.block,
           color: Colors.red,
         );
       } else {
         return const SizedBox.shrink();
       }
     }

     @override
     Widget build(BuildContext context) {
       return getIconForPriority(priority);
     }
   }
