using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectMove : MonoBehaviour
{
    void Start()
    {
        
    }

    void Update()
    {
        Vector3 vec = new Vector3(Input.GetAxis("Horizontal")*Time.deltaTime, Input.GetAxis("Vertical") * Time.deltaTime, 0);   //가속이동 GetAxisRaw(): 등속이동
        transform.Translate(vec);
    }
}
