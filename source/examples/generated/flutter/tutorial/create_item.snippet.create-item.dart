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
  var taskEditingController = TextEditingController();

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
          // ... other widgets
          SelectPriority(_priority, _setPriority), 
          // .. other widgets
        ],
      ),
    );
  }
}
