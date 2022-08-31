.. code-block:: text
   :emphasize-lines: 2, 18, 25, 33-36, 40-44, 65

   // ... other imports
   import 'package:flutter_todo/components/select_priority.dart'; 

   // showModifyItemModal function

   class ModifyItemForm extends StatefulWidget {
     final ItemViewModel item;
     const ModifyItemForm(this.item, {Key? key}) : super(key: key);

     @override
     _ModifyItemFormState createState() => _ModifyItemFormState();
   }

   class _ModifyItemFormState extends State<ModifyItemForm> {
     final _formKey = GlobalKey<FormState>();
     late bool _isComplete;
     late String _summary;
     late int _priority; 

     @override
     void initState() {
       super.initState();
       _summary = widget.item.summary;
       _isComplete = widget.item.isComplete;
       _priority = widget.item.priority; 
     }

     @override
     Widget build(BuildContext context) {
       TextTheme myTextTheme = Theme.of(context).textTheme;
       final item = widget.item;

       void updateItem() {
         item.update(
             summary: _summary, isComplete: _isComplete, priority: _priority);
       }

       // deleteItem and handleItemRadioChange functions

       void _setPriority(int priority) {
         setState(() {
           _priority = priority;
         });
       }

       return Padding(
         padding:
             EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
         child: Container(
           color: Colors.grey.shade100,
           padding: const EdgeInsets.only(
             top: 25,
             bottom: 25,
             left: 30,
             right: 30,
           ),
           child: Center(
             child: Form(
               key: _formKey,
               child: Column(
                 mainAxisAlignment: MainAxisAlignment.center,
                 mainAxisSize: MainAxisSize.min,
                 children: <Widget>[
                   // ... Text and TextFormField widgets
                   SelectPriority(_priority, _setPriority), 
                   // ... other widgets
                 ],
               ),
             ),
           ),
         ),
       );
     }
   }
