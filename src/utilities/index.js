// months abbr
export const monthNames =
    [
        {
            name: "Jan",
            paid: true,
            picked: false
        },
        {
            name: "Feb",
            paid: true,
            picked: false
        },
        {
            name: "Mar",
            paid: true,
            picked: false
        },
        {
            name: "Apr",
            paid: true,
            picked: false
        },
        {
            name: "May",
            paid: true,
            picked: false
        }, {
            name: "Jun",
            paid: true,
            picked: false
        }, {
            name: "Jul",
            paid: false,
            picked: false
        }, {
            name: "Aug",
            paid: false,
            picked: false
        }, {
            name: "Sept",
            paid: false,
            picked: false
        }, {
            name: "Oct",
            paid: false,
            picked: false
        }, {
            name: "Nov",
            paid: false,
            picked: false
        }, {
            name: "Dec",
            paid: false,
            picked: false
        },
    ];

export const ImgBaseUrl = "https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images";

export const BethelImage = "https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/bethels";

export const API_URL = "https://upendo-server.vercel.app//api/v1/firebase/"

export const base_URL = "https://upendo-server.vercel.app//api/v1/"

export const API_Base_URL = "https://upendo-server.vercel.app//api/v1/"

export const NumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// generate otp
export const GenerateOTP = (min, max) => {
    let randomNum = Math.random() * (max - min) + min;
    return Math.floor(randomNum);
  };

export function CurrentTime() {
    const currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    const amPm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return hour + ":" + (minute < 10 ? "0" : "") + minute + amPm;
}

export function CurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export function DuesMonths() {
    return [
        {
            name: "Jan",
            paid: false,
            picked: false,
            pay: false
        },
        {
            name: "Feb",
            paid: false,
            picked: false,
            pay: false
        },
        {
            name: "Mar",
            paid: false,
            picked: false,
            pay: false
        },
        {
            name: "Apr",
            paid: false,
            picked: false,
            pay: false
        },
        {
            name: "May",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Jun",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Jul",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Aug",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Sept",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Oct",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Nov",
            paid: false,
            picked: false,
            pay: false
        }, {
            name: "Dec",
            paid: false,
            picked: false,
            pay: false
        },
    ]
}

let currentYear = new Date().getFullYear()
export function RegYears() {
    return [
        {
            name: currentYear,
            paid: false,
            picked: false
        },
        {
            name: currentYear + 1,
            paid: false,
            picked: false
        },
        {
            name: currentYear + 2,
            paid: false,
            picked: false
        }, {
            name: currentYear + 3,
            paid: false,
            picked: false
        }, {
            name: currentYear + 4,
            paid: false,
            picked: false
        }, {
            name: currentYear + 5,
            paid: false,
            picked: false
        }, {
            name: currentYear + 6,
            paid: false,
            picked: false
        }, {
            name: currentYear + 7,
            paid: false,
            picked: false
        },
    ]
}