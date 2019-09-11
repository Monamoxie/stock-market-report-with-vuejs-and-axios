var process = {

  // This is the date on focus within the calendar, not necesarily todays date
  // But I initialized to todays local date by default

  currDate: new Date(), 

  getCurrYear: function() {
    return this.currDate.getFullYear();
  },
  
  getCurrMonth: function() {
    return this.currDate.getMonth();
  },

  getCurrDay: function() {
    return this.currDate.getDate();
  },

  /**
   * NOTE::
   * 
   * Since the Date object returns the numerical values of month (using a 0 based index), 
   * and days in numerical value
   * I needed to create a array manually mapping each index to the corresponding month
   */ 
  getMonthMapping: {
    0: 'January', 
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  },

  getWeekDaysMapping: {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednessday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  },

  getDaysCountInMonth: function() {  
    return new Date(this.getCurrYear(), this.getCurrMonth() + 1, 0).getDate();
  },

  getFirstDayOfWeekInMonth: function() {
    return new Date(this.getCurrYear(), this.getCurrMonth(), 1).getDay();
  },

  getDatesOfCurrMonth: function() {
    const dates = [];
   // alert( this.getFirstDayOfWeekInMonth() + '; Days in Month = '+this.getDaysCountInMonth() + '; Curr Month = '+this.getCurrMonth());
    for(var i = 1; i <= this.getDaysCountInMonth(); i++)
    {
      ( i >= this.getFirstDayOfWeekInMonth() ) ? dates.push(i) : dates.push(''); 
      // console.log(i);
    }
    return dates;
  }


}
 

new Vue({
  el: '#calendar-wrapper',
  
  data: {
    todays_date: process.getCurrDay() + ' ' + process.getMonthMapping[process.getCurrMonth() ] + ', '+process.getCurrYear(),
    days_of_the_week: process.getWeekDaysMapping,
  },

  computed: {
    dates_in_month: function () {
      return process.getDatesOfCurrMonth();
    }
  },

  methods: {
    moveToNextMonth: function () {
      let new_month = process.getCurrMonth() + 1;
      let year = process.getCurrMonth();
      if ( new_month === 12  ) {
        new_month  = 1;
        year += 1;
      } 
      process.currDate = new Date(year, new_month);
    },
    moveToPreviousMonth: function() {
      
    }
  }

  
});