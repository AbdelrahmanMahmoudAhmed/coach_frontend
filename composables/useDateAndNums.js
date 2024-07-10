import moment from "moment";


const useDateAndNums = () => {

    const useArabicNums = (string) => {
        // Convert Western numerals to Arabic numerals

        let current = typeof string == "number" ? string.toString() : string

        
        let stringWithNums = current?.replace(/[0-9]/g, function (num) {
            return String.fromCharCode(num.charCodeAt(0) + 1584);
        });
        return stringWithNums;

    }


    const useEnglishDates = (date) => {
        moment.updateLocale('en', {
            months:
                "January February March April May June July August October September November December".split(
                    " "
                ),
            monthsShort:
                "Jan Feb Mar Apr May Jun Jul Aug Sep Oct September Nov Dec".split(
                    " "
                ),
            weekdays:
                "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                    " "
                ),
            meridiem: function (hours, minutes, isLowercase) {
                return hours < 12 ? 'AM' : 'PM';
            }
            ,
        });

        const formattedDate = moment(date).format('dddd، d MMMM  YYYY h:mm A');

        return formattedDate
    }



    const useArabicDates = (date) => {

        moment.updateLocale("ar", {
            months:
                "يناير فبراير مارس ابريل مايو يونية يولية اغسطس سبتمبر اكتوبر نوفمبر ديسمبر".split(
                    " "
                ),
            monthsShort:
                "يناير فبراير مارس ابريل مايو يونية يولية اغسطس سبتمبر اكتوبر نوفمبر ديسمبر".split(
                    " "
                ),
            weekdays:
                "الاحد الاثنين الثلاثاء الاربعاء الخميس الجمعه السبت ".split(
                    " "
                ),
            meridiem: function (hours, minutes, isLowercase) {
                return hours < 12 ? 'ص' : 'م';
            }
            ,
        });
        moment.updateLocale("ar", {
            relativeTime: {
                future: "dans %s",
                past: "منذ %s",
                s: "ثوانى قليلة",
                m: "دقيقة واحدة",
                mm: "دقيقة",
                h: "ساعة واحدة",
                hh: "%d ساعات",
                d: "يوم واحد",
                dd: "%d أيام",
                M: "شهر واحد",
                MM: "%d شهور",
                y: "سنة واحدة",
                yy: "%d سنوات",
            },
        });
        const formattedDate = moment(date).format('dddd   ،   D MMMM YYYY   ,   mm : h   A');
        // const formattedDate = moment(date).format(' A  mm : h YYYY ،  MMMM  D ، dddd ');

        return useArabicNums(formattedDate)


    }



    return {
        useArabicDates,
        useEnglishDates,
        useArabicNums
    }
}

export default useDateAndNums


