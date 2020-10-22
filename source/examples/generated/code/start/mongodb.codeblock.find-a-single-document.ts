const venusFlytrap: Plant | null = await plants.findOne({
  name: "venus flytrap",
});
console.log(venusFlytrap);