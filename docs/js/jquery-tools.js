$(document).ready(function () {
  /* --Variables------------------------------------------------------------- */

  var toolsContainer = $('#tools-list')
  var jsonPath = 'data/tools.json'

  /* --Functions------------------------------------------------------------- */

  function expandLinked () {
    var url = document.location.toString()
    var hash = url.split('#')[1]

    if (typeof hash !== 'undefined') {
      var title = '#' + hash
      var panel = title + '_c'

      // collapse the expanded panel
      var allPanels = $('#accordion .accordion-collapse')

      allPanels.removeClass('in')
      allPanels.find('.accordion-toggle').addClass('collapsed')

      // expand the requested panel, change the title
      $(panel).addClass('in')
      $(title).find('.accordion-toggle').removeClass('collapsed')

      location.href = title
    }
  }

  function linkCats (cats) {
    var linked = []

    for (var i = 0; i < cats.length; i++) {
      var cat = cats[i]
      linked.push('<a href="categories.html#' + cat + '">' + cat.replace(/([a-z])([A-Z])/g, '$1 $2') + '</a>')
    }

    return linked.join(', ')
  }

  function printList () {
    /* -- Open JSON file, parse the contents, loop through & print markup -- */

    $.ajaxSetup({
      cache: false
    })

    $.getJSON(jsonPath, function (data) {
      $.each(data, function (key, value) {
        /* -- Assign returned data -- */
        var name = value.Name
        var doi = value.DOI
        var doiURL = value.DOIURL
        var pubDate = value.PubDate
        var preprint = value.Preprint
        var citations = value.Citations
        var description = value.Description
        var platform = value.Platform
        var code = value.Code
        var github = value.Github
        var added = value.Added
        var updated = value.Updated
        var license = value.License
        var cats = value.Categories
        var bioc = value.BioC
        var pypi = value.PyPI
        var cran = value.CRAN

        var entry = ''
        entry += '<div class="panel-heading">' +
                 '<h4 id="' + name + '" class="panel-title">' +
                 '<a data-toggle="collapse" class="accordion-toggle collapsed" href="#' + name + '_c">' + name

        if (typeof bioc !== 'undefined') {
          entry += ' <img border="0" height="15" src="http://bioconductor.org/shields/years-in-bioc/' + bioc + '.svg">' +
                   ' <img border="0" height="15" src="http://bioconductor.org/shields/downloads/' + bioc + '.svg">'
        }

        if (typeof cran !== 'undefined') {
          entry += ' <img border="0" height="15" src="http://www.r-pkg.org/badges/version/' + cran + '">' +
                   ' <img border="0" height="15" src="http://cranlogs.r-pkg.org/badges/grand-total/' + cran + '">'
        }

        if (typeof pypi !== 'undefined') {
          entry += ' <img border="0" height="15" src="https://img.shields.io/pypi/v/' + pypi + '.svg">' +
                   ' <img border="0" height="15" src="https://img.shields.io/pypi/pyversions/' + pypi + '.svg">' +
                   ' <img border="0" height="15" src="https://img.shields.io/pypi/status/' + pypi + '.svg">'
        }

        entry += '</a></h4></div>' +
                 '<div id="' + name + '_c" class="panel-collapse collapse">' +
                 '<ul class="list-group">' +
                 '<li class="list-group-item">' + description + '</li>'
        if (typeof doi !== 'undefined') {
          entry += '<li class="list-group-item">'
          if (typeof preprint !== 'undefined') {
            entry += '<strong>Preprint: </strong> <a href="' + doiURL + '">' + doi + '</a>'
          } else {
            entry += '<strong>Publication: </strong> <a href="' + doiURL + '">' + doi + '</a>' +
                     ', <strong>Date: </strong>' + pubDate
          }
          if (typeof citations !== 'undefined') {
            entry += ', <strong>Citations: </strong> ' + citations
          }
          entry += '</li>'
        }

        entry += '<li class="list-group-item"><strong>Platform: </strong> ' + platform + '</li>'
        if (typeof code !== 'undefined') {
            entry += '<li class="list-group-item"><strong>Code: </strong> <a href="' + code + '">' + code + '</a>'
            if (typeof github !== 'undefined') {
                entry += ' <img border="0" height="15" src="https://img.shields.io/github/stars/' + github + '.svg">' +
                    ' <img border="0" height="15" src="https://img.shields.io/github/forks/' + github + '.svg">' +
                    ' <img border="0" height="15" src="https://img.shields.io/github/last-commit/' + github + '.svg">'
            }
            entry += '</li>'
        }
        if (typeof license !== 'undefined') {
          entry += '<li class="list-group-item"><strong>License: </strong> ' + license + '</li>'
        }

        entry += '<li class="list-group-item"><strong>Categories: </strong> ' + linkCats(cats) + '</li>' +
                 '<li class="list-group-item">' +
                 '<strong>Added: </strong> ' + added +
                 ', <strong>Updated: </strong>' + updated +
                 '</li>' +
                 '</ul>' +
                 '</div>'

        /* -- Add it to the list! -- */
        toolsContainer.append(entry)
      })

      expandLinked()
    })
  }

  /* --Calls----------------------------------------------------------------- */

  printList()
})
