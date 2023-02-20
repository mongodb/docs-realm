useEffect(() => {
  console.log('In add sub effect');
  realm.subscriptions.update((subs, myRealm) => {
    subs.add(myRealm.objects('Bird'));
  });

  console.log(`number of subs: ${realm.subscriptions.length}`);

});
