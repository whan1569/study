using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using UnityEngine;

public class Force : MonoBehaviour
{
    Rigidbody rigid;
    void Start()
    {
        rigid = GetComponent<Rigidbody>();
        //rigid.velocity = new Vector3(2,4,-1);         //속력 바꾸기
        //rigid.AddForce(Vector3.up * 10, ForceMode.Impulse);
    }
    void Update()
    {
        if (Input.GetButtonDown("Jump"))
        {
            rigid.AddForce(Vector3.up * 5, ForceMode.Impulse);
        }
        Vector3 vec = new Vector3(Input.GetAxisRaw("Horizontal")/10,0, Input.GetAxisRaw("Vertical")/10);
        rigid.AddForce(vec, ForceMode.Impulse);     //힘을 가하기
       // rigid.AddTorque(Vector3.up);                  //회전
    }

    void OnTriggerStay(Collider other)
    {
        if(other.name=="Cube")
        {
            rigid.AddForce(Vector3.up * 1, ForceMode.Impulse);
        }
    }
}
