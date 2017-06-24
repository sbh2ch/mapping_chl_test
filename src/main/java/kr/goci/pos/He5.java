package kr.goci.pos;

import lombok.Data;

/**
 * Created by kiost on 2017-06-22.
 */
@Data
public class He5 {
    private String startX;
    private String startY;
    private String endX;
    private String endY;
    private String date;
    private String type;

    @Override
    public String toString() {
        return "He5{" +
                "startX=" + startX +
                ", startY=" + startY +
                ", endX=" + endX +
                ", endY=" + endY +
                ", date='" + date + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
