package com.mongodb.realm.livedataquickstart

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import com.mongodb.realm.livedataquickstart.databinding.CounterFragmentBinding
import com.mongodb.realm.livedataquickstart.model.CounterModel
import kotlinx.android.synthetic.main.counter_fragment.view.*

/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class CounterFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val model: CounterModel by viewModels()
        val binding = CounterFragmentBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = viewLifecycleOwner
            counterModel = model
        }

        binding.root.button.setOnClickListener {
            Log.v("QUICKSTART", "Clicked increment button. Current value: ${model.counter.value?.value?.get()}")
            model.incrementCounter()
        }
        return binding.root
    }
}