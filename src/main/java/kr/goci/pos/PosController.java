package kr.goci.pos;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

/**
 * Created by kiost on 2017-06-06.
 */
@RestController
@Slf4j
public class PosController {
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/api/{date}/{pos}/{zoom}/{type}")
    public ResponseEntity getValue(@PathVariable String date, @PathVariable String pos, @PathVariable String zoom, @PathVariable String type) throws Exception {
        Scanner scan = new Scanner(new File("C:/mat/output/" + zoom + "/" + pos + ".db"));
        long startTime = System.currentTimeMillis();
        String txt = "";
        int x = 0;
        int y = 0;
        String[][] arr = new String[100][100];

        while (scan.hasNext()) {
            txt = scan.nextLine();
            if (txt.equals("NaN"))
                txt = "";

            arr[x][y++] = txt;

            if (y == 100) {
                x++;
                y = 0;
            }
        }
        String test = objectMapper.writeValueAsString(arr);

        long endTime = System.currentTimeMillis();
        log.info("Scanner runtime check : " + (endTime - startTime) + "ms");

        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @GetMapping("/api/lonlat/{pos}/{zoom}")
    public ResponseEntity getLonLat(@PathVariable String pos, @PathVariable String zoom) throws Exception {
        long startTime = System.currentTimeMillis();
        String[] path = {"C:/mat/output/lon" + zoom + "/" + pos + ".db", "C:/mat/output/lat" + zoom + "/" + pos + ".db"};
        String[][][] arr = new String[2][100][100];

        for (int i = 0; i < 2; i++) {
            Scanner scan = new Scanner(new File(path[i]));
            String txt = "";
            int x = 0;
            int y = 0;
            while (scan.hasNext()) {
                txt = scan.nextLine();

                arr[i][x][y++] = txt;

                if (y == 100) {
                    x++;
                    y = 0;
                }
            }
        }
        String test = objectMapper.writeValueAsString(arr);

        long endTime = System.currentTimeMillis();
        log.info("LonLat runtime check : " + (endTime - startTime) + "ms");
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @PostMapping(value = "/api/image", produces = "application/json;charset=UTF-8")
    public ResponseEntity makeCrop(@RequestBody He5 he5) throws Exception {
        String[] dates = he5.getDate().split("-");
        String name = new SimpleDateFormat("yyMMddHHmmssSSS").format(new Date());
        String params = dates[0] + " " + dates[1] + " " + dates[2] + " " + dates[3] + " " + he5.getType() + " " + name + " " + he5.getStartX() + " " + he5.getEndX() + " " + he5.getStartY() + " " + he5.getEndY() + " C:\\";

        Runtime.getRuntime().exec("C:\\mat\\crop\\distrib\\testing.exe " + params).waitFor();

        log.info("created he5 : " + name + "_" + dates[0] + dates[1] + dates[2] + dates[3] + he5.getType() + ".he5");
        log.info("param : " + params);

        return new ResponseEntity<>(objectMapper.writeValueAsString(he5), HttpStatus.OK);
    }
}
