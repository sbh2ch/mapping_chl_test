package kr.goci.pos;

import lombok.Data;

/**
 * Created by kiost on 2017-06-06.
 */
@Data
public class Pos {
    private int x;
    private int y;

    @Override
    public String toString() {
        return "Pos{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
