.. code-block:: dart
   :caption: lib/components/create_item.dart
   :emphasize-lines: 3, 17, 21-25, 39, 51-54

   // ... other imports
   import 'package:flutter_todo/viewmodels/item_viewmodel.dart';
   import 'package:flutter_todo/components/select_priority.dart'; 

   // ... CreateItem widget

   // _CreateItemFormWrapper widget

   class CreateItemForm extends StatefulWidget {
     const CreateItemForm({Key? key}) : super(key: key);

     @override
     _CreateItemFormState createState() => _CreateItemFormState();
   }

   class _CreateItemFormState extends State<CreateItemForm> {
     int _priority = PriorityLevel.low; 
     final _formKey = GlobalKey<FormState>();
     var itemEditingController = TextEditingController();

     void _setPriority(int priority) {
       setState(() {
         _priority = priority;
       });
     }

     @override
     Widget build(BuildContext context) {
       TextTheme myTextTheme = Theme.of(context).textTheme;
       final currentUser = Provider.of<AppServices>(context).currentUser;

       return Form(
         key: _formKey,
         child: Column(
           mainAxisAlignment: MainAxisAlignment.center,
           mainAxisSize: MainAxisSize.min,
           children: <Widget>[
             // ... Text and TextFormField widgets
             SelectPriority(_priority, _setPriority), 
             // .. other widgets
                   // Set priority when creating an Item
                   Container(
                     margin: const EdgeInsets.symmetric(horizontal: 10),
                     child: Consumer<Realm>(
                       builder: (context, realm, child) {
                         return ElevatedButton(
                           child: const Text('Create'),
                           onPressed: () {
                             if (_formKey.currentState!.validate()) {
                               final summary = itemEditingController.text;
                               ItemViewModel.create(
                                   realm,
                                   Item(ObjectId(), summary, currentUser!.id,
                                       priority: _priority));
                               Navigator.pop(context);
                             }
                           },
                         );
                       },
                     ),
                   ),
   // ...closing brackets and parentheses
