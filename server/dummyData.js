import Field from './models/field';

export default function () {
  Field.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const field = new Field({ name: '_id', description: 'Index field', isActive: true, isRequired: true , type: 'id'});

    Field.create([field], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
