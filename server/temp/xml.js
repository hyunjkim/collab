        xml.onreadystatechange = () => {
            if (req.readyState === 4) {
            let data = null;
            try {
              data = req.responseText ? JSON.parse(req.responseText) : '';
            } catch (e) {
              console.error(e);
            }

            if (req.status >= 200 && req.status < 300) {
              success(data);
            } else {
              failure();
            }
          }
        }
        xml.open("GET", req.params, true); // true for asynchronous
        xml.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        let dataAsJson = JSON.stringify(data);
        // xml.send(dataAsJson);
        res.json(dataAsJson)
