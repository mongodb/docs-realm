.. code-block:: swift

    let pipeline : [Document] = [
        [ "$group": [
            "_id": "$customerId",
            "numPurchases": ["$sum": 1] as Document,
            "numItemsPurchased": ["$sum": ["$size": "$items"] as Document] as Document,
        ] as Document] as Document,
        [ "$addFields": [
            "averageNumItemsPurchased": [
                "$divide": ["$totalQuantity", "$count"] as Document
            ] as Document
        ] as Document ] as Document
    ];

    purchasesCollection?.aggregate(pipeline).toArray({ result in
        switch result {
        case .success(let customers):
            print("Successfully grouped purchases for \(customers.count) customers:");
            customers.forEach({ customer in
                print("customer id: \(customer._id)");
                print("num purchases: \(customer.numPurchases)");
                print("total items purchased: \(customer.numItemsPurchased)");
                print("average items purchased: \(customer.averageNumItemsPurchased)");
            })
        case .failure(let error):
            print("Failed to group purchases by customer: \(err)");
        }
    })
