package kr.goci.pos;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Scanner;

/**
 * Created by kiost on 2017-06-06.
 */
@RestController
@Slf4j
public class PosController {
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/api/{date}/{pos}/{type}")
    public ResponseEntity getValue(@PathVariable String date, @PathVariable String pos, @PathVariable String type) throws Exception {
        Scanner scan = new Scanner(new File("C:/mat/output/origin/" + pos + "test.pos"));

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
        return new ResponseEntity<>(test, HttpStatus.OK);
    }
}
