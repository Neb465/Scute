export const fetchAutoFill = async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json({message: "No query"});
    }

    const response = await fetch(
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: query,
        format: "json",
        limit: "5",
        viewbox: "-76.95163, 38.98113, -76.93339, 38.99774",
		    bounded: "1",
        dedupe: "1",
        addressdetails: "1"
      }),
      {
        headers: {
          "User-Agent": "Scute"
        }
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (e) {
    next(e);
  }
}