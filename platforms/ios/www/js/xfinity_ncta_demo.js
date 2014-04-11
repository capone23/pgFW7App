var myApp = new Framework7({
    onBeforePageInit: function (page) {
        // Do something when page just added to DOM
        // console.log(page);
    },
    onPageInit: function (page) {
        // Do something on page init
        // console.log(page);
    },
    onPageAfterAnimation: function (page) {
        // Do something on page before animation start
        // console.log(page);
    },
    onPageBeforeAnimation: function (page) {
        // Do something on page ready(centered)
        // console.log(page);
    }
});

// Expose Internal DOM library
var $$ = myApp.$;

// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});

// Events for specific pages when it initialized
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    // Handle Modals Page event when it is init
    if (page.name === 'modals') {
        $$('.demo-alert').tap(function () {
            myApp.alert('Hello!');
        });
        $$('.demo-confirm').tap(function () {
            myApp.confirm('Are you feel good today?', function () {
                myApp.alert('Great!');
            });
        });
        $$('.demo-prompt').tap(function () {
            myApp.prompt('What is your name?', function (data) {
                // @data contains input value
                myApp.confirm('Are you sure that your name is ' + data + '?', function () {
                    myApp.alert('Ok, your name is ' + data + ' ;)');
                });
            });
        });
    }
    //Preloader page events
    if (page.name === 'preloader') {
        $$('.demo-indicator').tap(function () {
            myApp.showIndicator();
            setTimeout(function () {
                myApp.hideIndicator();
            }, 2000);
        });
        $$('.demo-preloader').tap(function () {
            myApp.showPreloader();
            setTimeout(function () {
                myApp.hidePreloader();
            }, 2000);
        });
        $$('.demo-preloader-custom').tap(function () {
            myApp.showPreloader('My text...');
            setTimeout(function () {
                myApp.hidePreloader();
            }, 2000);
        });
    }
    //Swipe to delete events callback demo
    if (page.name === 'swipe-delete') {
        $$('.demo-remove-callback').on('deleted', function () {
            myApp.alert('Thanks, item removed!');
        });
    }
    // Action sheet, we use it on two pages
    if (page.name === 'swipe-delete' || page.name === 'modals') {
        $$('.demo-actions').tap(function () {
            myApp.actions([
                // First buttons group
                [
                    // Group Label
                    {
                        text: 'Here comes some optional description or warning for actions below',
                        label: true
                    },
                    // First button
                    {
                        text: 'Alert',
                        onClick: function () {
                            myApp.alert('He Hoou!');
                        }
                    },
                    // Another red button
                    {
                        text: 'Nice Red Button ',
                        red: true,
                        onClick: function () {
                            myApp.alert('You have clicked red button!');
                        }
                    },
                ],
                // Second group
                [
                    {
                        text: 'Cancel',
                        bold: true
                    }
                ]
            ]);
        });
    }
    //Messages page
    if (page.name === 'messages') {
        var conversationStarted = false;
        var answers = [
            'Yes!',
            'No',
            'Hm...',
            'I am not sure',
            'And what about you?',
            'May be ;)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tincidunt erat, a convallis leo rhoncus vitae.'
        ];
        var answerTimeout;
        $$('.ks-messages-form').on('submit', function (e) {
            e.preventDefault();
            var input = $$(this).find('.ks-messages-input');
            var messageText = input.val();
            if (messageText.length === 0) return;
            // Empty input
            input.val('');
            // Add Message
            myApp.addMessage({
                text: messageText,
                type: 'sent',
                day: !conversationStarted ? 'Today' : false,
                time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
            });
            conversationStarted = true;
            // Add answer after timeout
            if (answerTimeout) clearTimeout(answerTimeout);
            answerTimeout = setTimeout(function () {
                myApp.addMessage({
                    text: answers[Math.floor(Math.random() * answers.length)],
                    type: 'received'
                });
            }, 2000);
        });
        $$('.ks-send-message').tap(function () {
            $$('.ks-messages-form').trigger('submit');
        });
    }
    // Pull To Refresh Demo
    if (page.name === 'pull-to-refresh') {
        // Dummy Content
        var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
        var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
        // Pull to refresh content
        var ptrContent = $$(page.container).find('.pull-to-refresh-content');
        // Add 'refresh' listener on it
        ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
                var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
                var song = songs[Math.floor(Math.random() * songs.length)];
                var author = authors[Math.floor(Math.random() * authors.length)];
                var linkHTML = '<li class="fb-post-frame">' +
                            ' <div class="item-content list-block-fb">' +
                            ' <div class="item-media"><img src="img/fb-icon6_@2x.png" width="44"/></div>' +
                            ' <div class="item-inner">' +
                            ' <div class="item-title-row">' +
                            ' <div class="item-title">Comcast Xfinity</div>' +
                            ' </div>' +
                            ' <div class="item-subtitle gray">Sunday at 10:56 AM</div>' +
                            ' </div>' +
                            ' </div>' +
                            ' <article>' +
                            ' <span>Xfinity X1 TV and blazing fast internet is avialable at your new home!</span></br>' +
                            ' <a href="hello.html">Learn about transfering service</a>' +
                            ' </article>' +
                            ' <div class="item-content2">' +
                            ' <div class="item-inner">' +
                            ' <ul class="fb-options">' +
                            ' <li class="like">Like</li>' +
                            ' <li class="comment">Comment</li>' +
                            ' <li class="share">Share</li>' +
                            ' </ul> ' +
                            ' </div>' +
                            ' </div>' +
                            ' </li>';
                ptrContent.find('ul.new-post').prepend(linkHTML);
                // When loading done, we need to "close" it
                myApp.pullToRefreshDone();
            }, 2000);
        });
    }

    // Date picker demo 
    if (page.name === 'disconnect-date'){
        // var datePicker = "date PICKER HERE";

        // var ptrContent = $$(page.container).find('.nativedatepicker-wrapper');

        // ptrContent.prepend(datePicker);

        // prep some variables
          // var startDate = new Date(2014,2,15,18,30,0,0,0); // beware: month 0 = january, 11 = december
          // var endDate = new Date(2014,2,15,19,30,0,0,0);
          // var title = "My nice event";
          // var location = "Home";
          // var notes = "Some notes about this event.";
          // var success = function(message) { alert("Success: " + JSON.stringify(message)); };
          // var error = function(message) { alert("Error: " + message); };

          // // create a calendar (iOS only for now)
          // window.plugins.calendar.createCalendar(calendarName,success,error);

          // // delete a calendar (iOS only for now)
          // window.plugins.calendar.deleteCalendar(calendarName,success,error);

          // // create an event silently (on Android < 4 an interactive dialog is shown)
          // window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);

          // // create an event silently (on Android < 4 an interactive dialog is shown which doesn't use this options) with options.
          // // The options support one option for now, but I will add more in the future:
          // var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
          // calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm)
          // window.plugins.calendar.createEventWithOptions(title,location,notes,startDate,endDate,calOptions,success,error);

          // // create an event interactively (only supported on Android)
          // window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);

          // // create an event in a named calendar (iOS only for now)
          // window.plugins.calendar.createEventInNamedCalendar(title,location,notes,startDate,endDate,calendarName,success,error);

          // // find events
          // window.plugins.calendar.findEvent(title,location,notes,startDate,endDate,success,error);

          // // list all events in a date range (only supported on Android for now)
          // window.plugins.calendar.listEventsInRange(startDate,endDate,success,error);

          // // list all calendar names - returns this JS Object to the success callback: [{"id":"1", "name":"first"}, ..]
          // window.plugins.calendar.listCalendars(success,error);

          // // find all events in a named calendar (iOS only for now)
          // window.plugins.calendar.findAllEventsInNamedCalendar(calendarName,success,error);

          // // change an event (iOS only for now)
          // var newTitle = "New title!";
          // window.plugins.calendar.modifyEvent(title,location,notes,startDate,endDate,newTitle,location,notes,startDate,endDate,success,error);

          // // delete an event (you can pass nulls for irrelevant parameters, note that on Android `notes` is ignored)
          // window.plugins.calendar.deleteEvent(newTitle,location,notes,startDate,endDate,success,error);

    }

    if (page.name === 'new-install'){
        $(function(){
          $.datepicker.setDefaults(
            $.extend($.datepicker.regional[''])
          );
          $('#datepicker').datepicker();
          $('#datepicker2').datepicker();
        });
    }

});

// Required for demo popover
$$('.popover a').tap(function () {
    myApp.closeModal('.popover');
});

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

// Generate Content Dynamically
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link">Back</a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}
$$(document).tap('.ks-generate-page', createContentPage);