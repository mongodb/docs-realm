// Configure the sign up button.
signUpButton.setTitle("Sign Up", for: .normal)
signUpButton.addTarget(self, action: #selector(signUp), for: .touchUpInside)
container.addArrangedSubview(signUpButton)
