/* global Authors:true, Books:true */
/* global Factory */

Authors = new Meteor.Collection('authors-factory');
Books = new Meteor.Collection('books-factory');

Tinytest.add('Factory - Build - Basic build works', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  test.equal(Factory.build('author').name, 'John Smith');
});


Tinytest.add('Factory - Build - Basic build lets you set _id', (test) => {
  Factory.define('author', Authors, {
    _id: 'my-id'
  });

  test.equal(Factory.build('author')._id, 'my-id');
});


Tinytest.add('Factory - Define - AfterBuild hook', (test) => {
  let result;

  Factory.define('author', Authors, {
    name: 'John Smith'
  }).afterBuild((doc) => {
    result = doc;
  });

  const author = Factory.create('author');
  test.equal(author.name, 'John Smith');
  test.equal(result.name, 'John Smith');
});

Tinytest.add('Factory - Create - After hook that builds', (test) => {
  Factory.define('authorWithFriends', Authors, {
    name: 'John Smith'
  }).afterBuild((doc, dataset) => {
    doc.friendIds = _.times(2, () => {
      return dataset.add('author')._id;
    });
  });

  const author = Factory.create('authorWithFriends');
  test.equal(author.friendIds.length, 2);
  test.isTrue(!!Authors.findOne(author.friendIds[0]));
});

Tinytest.add('Factory - Build - Functions - Basic', (test) => {
  Factory.define('author', Authors, {
    name: function() {
      return 'John Smith';
    }
  });

  test.equal(Factory.build('author').name, 'John Smith');
});

Tinytest.add('Factory - Build - Functions - Context', (test) => {
  Factory.define('author', Authors, {
    test: 'John Smith',
    name: function() {
      return this.test;
    }
  });

  test.equal(Factory.build('author').name, 'John Smith');
});

Tinytest.add('Factory - Build - Dotted properties - Basic', (test) => {
  Factory.define('author', Authors, {
    'profile.name': 'John Smith'
  });

  test.equal(Factory.build('author').profile.name, 'John Smith');
});

Tinytest.add('Factory - Build - Dotted properties - Context', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith',
    'profile.name': function() {
      return this.name;
    }
  });

  test.equal(Factory.build('author').profile.name, 'John Smith');
});

Tinytest.add('Factory - Build - Deep objects', (test) => {
  Factory.define('author', Authors, {
    profile: {
      name: 'John Smith'
    }
  });

  test.equal(Factory.build('author').profile.name, 'John Smith');
});

Tinytest.add('Factory - Build - Functions - Deep object - Basic', (test) => {
  Factory.define('author', Authors, {
    profile: {
      name: function() {
        return 'John Smith';
      }
    }
  });

  test.equal(Factory.build('author').profile.name, 'John Smith');
});

Tinytest.add('Factory - Build - Functions - Deep object - Context', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith',
    profile: {
      name: function() {
        return this.name;
      }
    }
  });

  test.equal(Factory.build('author').profile.name, 'John Smith');
});

Tinytest.add('Factory - Build - Extend - Basic', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  Factory.define('authorOne', Authors, Factory.extend('author'));

  test.equal(Factory.build('authorOne').name, 'John Smith');
});

Tinytest.add('Factory - Build - Extend - With attributes', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  Factory.define('authorOne', Authors, Factory.extend('author', {
    test: 'testing!'
  }));

  test.equal(Factory.build('authorOne').name, 'John Smith');
  test.equal(Factory.build('authorOne').test, 'testing!');
});

Tinytest.add('Factory - Build - Extend - With attributes (check that we do not modify the parent)',
  (test) => {
    Factory.define('author', Authors, {
      name: 'John Smith'
    });

    Factory.define('authorOne', Books, Factory.extend('author', {
      test: 'testing!'
    }));

    const authorOne = Factory.build('authorOne');
    const author = Factory.build('author');

    test.equal(authorOne.name, 'John Smith');
    test.equal(authorOne.test, 'testing!');
    test.equal(_.isUndefined(author.test), true);
  }
);

Tinytest.add('Factory - Build - Extend - Parent with relationship', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  Factory.define('book', Books, {
    authorId: Factory.get('author'),
    name: 'A book',
    year: 2014
  });

  Factory.define('bookOne', Books, Factory.extend('book'));

  const bookOne = Factory.create('bookOne');

  test.equal(bookOne.name, 'A book');
});

Tinytest.add('Factory - Build - Extend - Parent with relationship - Extra attributes',
  (test) => {
    Factory.define('author', Authors, {
      name: 'John Smith'
    });

    Factory.define('book', Books, {
      authorId: Factory.get('author'),
      name: 'A book',
      year: 2014
    });

    Factory.define('bookOne', Books, Factory.extend('book', {
      name: 'A better book'
    }));

    const bookOne = Factory.create('bookOne');

    test.equal(bookOne.name, 'A better book');
    // same year as parent
    test.equal(bookOne.year, 2014);
  }
);

Tinytest.add('Factory - Create - Basic', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  const author = Factory.create('author');

  test.equal(author.name, 'John Smith');
});

Tinytest.add('Factory - Create - Relationship', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  Factory.define('book', Books, {
    authorId: Factory.get('author'),
    name: 'A book',
    year: 2014
  });

  Authors.remove({});
  const book = Factory.create('book');

  test.equal(Authors.findOne(book.authorId).name, 'John Smith');
});

Tinytest.add('Factory - Create - Relationship - return a Factory from function', (test) => {
  Factory.define('author', Authors, {
    name: 'John Smith'
  });

  Factory.define('book', Books, {
    authorId: function() {
      return Factory.get('author');
    },
    name: 'A book',
    year: 2014
  });

  const book = Factory.create('book');

  test.equal(Authors.findOne(book.authorId).name, 'John Smith');
});

Tinytest.add('Factory - Create - Relationship - return a Factory from deep function (dotted)',
  (test) => {
    Factory.define('author', Authors, {
      name: 'John Smith'
    });

    Factory.define('book', Books, {
      'good.authorId': function() {
        return Factory.get('author');
      },
      name: 'A book',
      year: 2014
    });

    const book = Factory.create('book');

    test.equal(Authors.findOne(book.good.authorId).name, 'John Smith');
  }
);

Tinytest.add('Factory - Create - Relationship - return a Factory from deep function',
  (test) => {
    Factory.define('author', Authors, {
      name: 'John Smith'
    });

    Factory.define('book', Books, {
      good: {
        authorId: function() {
          return Factory.get('author');
        }
      },
      name: 'A book',
      year: 2014
    });

    const book = Factory.create('book');

    test.equal(Authors.findOne(book.good.authorId).name, 'John Smith');
  }
);
