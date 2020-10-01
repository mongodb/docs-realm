const ProjectSchema = {
  name: 'Project',
  embedded: true,
  properties: {
    name: 'string?',
    partition: 'string?',
  },
};