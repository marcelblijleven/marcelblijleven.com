
interface ParsedMilliseconds {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
}

function parseMilliseconds(ms: number): ParsedMilliseconds {
    if (ms === 0) {
        return {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
        };
    }

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60) ;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24)

    return {
            seconds: seconds % 60,
            minutes: minutes % 60,
            hours: hours % 24,
            days: days,
    }
}

export function getNaturalDate(date: Date): string  {
    const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});
    const now = Date.now();
    const diff = (now - date.getTime());
    const {days, hours, minutes, seconds} = parseMilliseconds(diff);

    if (days !== 0) {
        return rtf.format(-1 * days, "days");
    }

    if (hours !== 0) {
        return rtf.format(-1 * hours, "hours");
    }

    if (minutes !== 0) {
        return rtf.format(-1 * minutes, "minutes");
    }

    if (seconds !== 0) {
        return rtf.format(-1 * seconds, "seconds");
    }

    return "Just now"
}