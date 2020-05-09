using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectLifeCycle : MonoBehaviour
{
    void Awake()
    {
        Debug.Log("오브젝트 생성시 최초 실행");
    }
    void OnEnable()          //활성화
    {
        Debug.Log("활성화 ex)Login ");
    }
    void Start()             //초기화
    {
        Debug.Log("업데이트 시작전 최초 실행");
    }
    void FixedUpdate()       //물리연산 업데이트
    {
        Debug.Log("물리연산 업데이트");
    }
    void Update()            //게임 로직 업데이트
    {
        Debug.Log("게임 로직 업데이트");
    }
    void LateUpdate()        //업데이트 이후
    {
        Debug.Log("업데이트 이후");
    }
    void OnDisable()          //비활성화
    {
        Debug.Log("비활성화 ex)Logout ");
    }
    void OnDestroy()         //로직 해제
    {
        Debug.Log("로직 해제");
    }
}
