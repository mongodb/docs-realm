import 'package:flutter/material.dart';
import 'package:flutter_todo/viewmodels/item_viewmodel.dart';

class SelectPriority extends StatefulWidget {
  int priority;
  void Function(int priority) setFormPriority;

  SelectPriority(this.priority, this.setFormPriority, {Key? key})
      : super(key: key);

  @override
  State<SelectPriority> createState() => _SelectPriorityState();
}

class _SelectPriorityState extends State<SelectPriority> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Priority'),
          DropdownButtonFormField<int>(
            onChanged: ((int? value) {
              final valueOrDefault = value ?? PriorityLevel.low;
              widget.setFormPriority(valueOrDefault);
              setState(() {
                widget.priority = valueOrDefault;
              });
            }),
            value: widget.priority,
            items: [
              DropdownMenuItem(
                  child: const Text("Low"), value: PriorityLevel.low),
              DropdownMenuItem(
                  child: const Text("Medium"), value: PriorityLevel.medium),
              DropdownMenuItem(
                  child: const Text("High"), value: PriorityLevel.high),
              DropdownMenuItem(
                  child: const Text("Severe"), value: PriorityLevel.severe),
            ],
          ),
        ],
      ),
    );
  }
}
