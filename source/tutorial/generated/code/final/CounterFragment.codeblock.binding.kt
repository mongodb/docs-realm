val binding = CounterFragmentBinding.inflate(inflater, container, false).apply {
    lifecycleOwner = viewLifecycleOwner
    counterModel = model
}.root

binding.rootView.button.setOnClickListener {
    model.incrementCounter()
}
return binding