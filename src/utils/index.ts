

export const hoursAgo = (hours = 0) => {
    const daytime = new Date();
    daytime.setHours(daytime.getHours() - hours);
    return daytime
}