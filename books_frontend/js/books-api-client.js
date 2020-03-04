function BooksApi(rootUrl) {
    if (rootUrl.endsWith("/")) {
        this.rootUrl = rootUrl.substring(0, rootUrl.length - 1);
    } else {
        this.rootUrl = rootUrl;
   }
}

BooksApi.prototype.fetchBooks = function(onSuccess, onFailure) {
    $.getJSON(`${this.rootUrl}/book/`)
     .done(onSuccess)
     .fail(onFailure);
};

BooksApi.prototype.fetchBook = function(id, onSuccess, onFailure) {
    $.getJSON(`${this.rootUrl}/book/${id}`)
     .done(onSuccess)
     .fail(onFailure);
};

BooksApi.prototype.deleteBook = function(id, onSuccess, onFailure) {
    $.ajax({
        url: `${this.rootUrl}/book/${id}`,
        type: "DELETE",
    }).done(onSuccess)
      .fail(onFailure);
};

BooksApi.prototype.createBook = function(book, onSuccess, onFailure) {
    $.ajax({
        url: `${this.rootUrl}/book/`,
        type: "POST",
        dataType: "json",
        data: book
    }).done(onSuccess)
      .fail(onFailure);
};

BooksApi.prototype.updateBook = function(id, book, onSuccess, onFailure) {
    $.ajax({
        url: `${this.rootUrl}/book/${id}`,
        type: "PUT",
        dataType: "json",
        data: book
    }).done(onSuccess)
      .fail(onFailure);
};