useEffect(() => {
  realm.subscriptions.update((subs, myRealm) => {
    subs.add(myRealm.objects('Bird'));
  });

});
