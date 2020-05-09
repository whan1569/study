    using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using UnityEngine;

public class ObjectAutoMove : MonoBehaviour
{
    Vector3 target = new Vector3(8, 0.5f, 0);
    void Update()
    {
        //transform.position = Vector3.MoveTowards(transform.position,target,0.1f);                 //등속이동(현재위치,목표위치,속도)

        //Vector3 velo = Vector3.zero;
        //transform.position = Vector3.SmoothDamp(transform.position, target, ref velo , 0.5f);     //부드러운 감속이동(현재위치,목표위치,참조 속도,속도)

        //transform.position = Vector3.Lerp(transform.position, target, 0.01f);                     //감속이동(현재위치,목표위치,속도[반비례])

        transform.position = Vector3.Slerp(transform.position, target, 0.01f);                      //포물선이동(현재위치,목표위치,속도)
    }
}
