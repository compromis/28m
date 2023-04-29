const candidates = {
  JB: { name: "Joan Baldoví", class: "blando" },
  AM: { name: "Aitana Mas", class: "aitana" },
  VM: { name: "Vicent Marzà", class: "marza" },
  MJA: { name: "Mª Josep Amigó", class: "amigo" },
  JR: { name: "Joan Ribó", class: "ribo" },
};

export const useEvents = (events) => {
  const sortedEvents = events
    .slice(1)
    .map((event) => {
      const [
        rawDate,
        rawTime,
        title,
        municipality,
        venue,
        names,
        info,
        baldoneta,
      ] = event;

      const date = rawDate.split("/");
      const hour = rawTime.split(":");
      const year = date[2];
      const month = parseInt(date[1]) - 1;
      const day = parseInt(date[0]);
      const hours = parseInt(hour[0]);
      const minutes = parseInt(hour[1]);
      const speakers = names.split(", ").map((candidate) => {
        if (candidate in candidates) {
          return candidates[candidate];
        }
        return { name: candidate, class: "other" };
      });

      return {
        date: new Date(year, month, day, hours, minutes),
        title,
        municipality,
        venue,
        speakers,
        info,
        baldoneta: baldoneta === "TRUE",
      };
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  const now = new Date();
  const upcomingEvents = sortedEvents.filter((event) => event.date >= now);
  const pastEvents = sortedEvents.filter((event) => event.date < now);

  return { upcomingEvents, pastEvents };
};
