$(function() {

    var api = new BooksApi("http://localhost:8000");

    function sortByTitle(books) {
        books.sort(function(book1, book2) {
            return book1.title.localeCompare(book2.title);
        });
    }

    function renderTable(books) {

        sortByTitle(books);

        var tbody = $("tbody");
        tbody.empty();

        for (var book of books) {

            var removeButton = $("<a style='cursor: pointer'>🗑️</a>");
            removeButton.click(function(event) {
                event.stopPropagation();
                var tr = $(this).parent().parent();
                var bookId = tr.data("id");

                api.deleteBook(bookId, book => tr.remove());
                // $.ajax({
                //     url: `http://localhost:8000/book/${bookId}`,
                //     type: "DELETE",
                // }).done(function(book) {
                //     tr.remove();
                // });
            });

            var tr = $(`<tr data-id="${book.id}">
                           <td>
                               ${book.title}
                               <pre></pre>
                           </td>
                           <td>${book.author}</td>
                           <td>${book.isbn}</td>
                           <td></td>
                        </tr>`);
            tr.children().last().append(removeButton);

            tbody.append(tr);
            tr.click(function() {

                var self = $(this);
                var pre = self.find("pre");

                if (pre.text() === "") {
                    var bookId = self.data("id");
                    api.fetchBook(bookId, book => self.find("pre").text(JSON.stringify(book, null, 4)));
                    // $.getJSON(`http://localhost:8000/book/${bookId}`)
                    //  .done(function(book) {
                    //      self.find("pre").text(JSON.stringify(book, null, 4));
                    //  });
                } else {
                    pre.text("");
                }
            });
        }
    }

    var authorInput = $("input[name=author]");
    var titleInput = $("input[name=title]");
    var isbnInput = $("input[name=isbn]");
    var publisherInput = $("input[name=publisher]");
    var genreInput = $("select[name=genre]");

    var addBookForm = $("#addBookForm");
    addBookForm.on("submit", function(event) {
        event.preventDefault();

        var book = {
            author: authorInput.val(),
            title: titleInput.val(),
            isbn: isbnInput.val(),
            publisher: publisherInput.val(),
            genre: parseInt(genreInput.val())
        };

        api.createBook(book, book => {
            authorInput.val("");
            titleInput.val("");
            isbnInput.val("");
            publisherInput.val("");

            api.fetchBooks(renderTable);
        });
        // $.ajax({
        //     url: "http://localhost:8000/book/",
        //     type: "POST",
        //     dataType: "json",
        //     data: book
        // }).done(function(book) {

        //     authorInput.val("");
        //     titleInput.val("");
        //     isbnInput.val("");
        //     publisherInput.val("");

        //     api.fetchBooks(renderTable);
        //     // getAllBooks();
        // });
    });

    // function getAllBooks() {

    //     $.getJSON("http://localhost:8000/book/")
    //      .done(function(books) {
    //          renderTable(books);
    //      })
    //      .fail(function(error) {
    //          // TODO no books available
    //      });
    //  }

    api.fetchBooks(renderTable);
});