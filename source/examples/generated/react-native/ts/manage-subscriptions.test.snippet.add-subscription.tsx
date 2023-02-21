const seenBirds = useQuery(Bird).filtered('haveSeen == true');

useEffect(() => {
  realm.subscriptions.update(mutableSubs => {
    mutableSubs.add(seenBirds);
  });
});
