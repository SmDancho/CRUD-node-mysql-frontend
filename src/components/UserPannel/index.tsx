import axios from 'axios';
import { Table } from '../table';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { user } from '../../types';

export const Pannel = () => {
  const [users, setData] = useState<user[]>([]);

  const [currentUser, setCurrentUser] = useState<user>();
  const [status, setStatus] = useState();
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const [currentUserid, setCurrentUserId] = useState();
  const [userIds, setUserIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);

  const name = currentUser?.name;

  if (status === 'blocked') {
    navigate('/');
  }
  const handleBlock = () => {
    userIds.map((id) => {
      console.log(id);
      if (currentUserid === id) {
        localStorage.removeItem('token');
        navigate('/');
      }
      return axios
        .post('http://localhost:5000/auth/block', { id: id })
        .then((response) => {
          setStatus(response.data);
          if (ref.current != null) {
            ref.current.checked = false;
          }
          setUserIds([]);
        });
    });
  };

  const handleUnBlock = () => {
    userIds.map((id) => {
      return axios
        .post('http://localhost:5000/auth/unblock', { id: id })
        .then((response) => {
          setStatus(response.data);
          if (ref.current != null) {
            ref.current.checked = false;
          }
          setUserIds([]);
        });
    });
  };

  const handledelete = () => {
    userIds.map((id) => {
      if (currentUserid === id) {
        localStorage.removeItem('token');
        navigate('/');
      }
      return axios
        .post('http://localhost:5000/auth/delete', { id: id })
        .then((response) => {
          setStatus(response.data);
          if (ref.current != null) {
            ref.current.checked = false;
          }
          setUserIds([]);
        });
    });
  };

  const getAllUsers = () => {
    axios
      .get('http://localhost:5000/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setData(response.data));
  };

  const getCurrentUser = () => {
    axios
      .get('http://localhost:5000/auth/getme', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStatus(response.data.User.status);
        setCurrentUser(response.data.User);
        setToken(response.data.token);
        setCurrentUserId(response.data.User.id);
      });
  };
  useEffect(() => {
    getCurrentUser();
    getAllUsers();
  }, [status, token]);
  return (
    <div className="w-[1280px] m-auto ">
      <div className="w-full h-[100vh]">
        <div className="w-full flex justify-around m-auto items-center">
          <div className="w-[50px]">id</div>
          <div className="w-[50px]">name</div>
          <div className="w-[125px] text-center"> mail</div>
          <div className="w-[188px] text-center">registration time</div>
          <div className="w-[188px]"> last login time</div>
          <div> status</div>
        </div>

        <div className="flex justify-center items-center flex-col mt-[100px] border-4 border-collapse">
          <div className="flex w-full m-auto">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-5 p-5">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="chekall"
                  onChange={(e: any) => {
                    if (e.target.checked) {
                      setData(
                        users.map((item) => {
                          item.checked = true;
                          setUserIds((val: Array<any>) => [...val, item.id]);

                          return item;
                        })
                      );
                    } else {
                      setData(
                        users.map((item) => {
                          item.checked = false;
                          setUserIds((val: Array<any>) => [...val]);
                          return item;
                        })
                      );
                    }
                  }}
                />
                <label htmlFor="chekall">select all</label>
                <button
                  onClick={() => handleBlock()}
                  type="submit"
                  className="w-[80px] h-[30px] border-red-500 bg-red-500 rounded-lg text-white"
                >
                  block
                </button>
                <button
                  onClick={() => {
                    handleUnBlock();
                  }}
                  type="submit"
                  className="w-[80px] h-[30px] border-green-500 bg-green-500 rounded-lg text-white"
                >
                  unblock
                </button>
                <button
                  onClick={() => handledelete()}
                  type="submit"
                  className="w-[80px] h-[30px] border-yellow-300  bg-yellow-300 rounded-lg text-black"
                >
                  delete
                </button>
                <div>
                  current user: <strong>{name}</strong>
                </div>

                <button
                  onClick={() => {
                    sessionStorage.removeItem('token');
                    navigate('/');
                  }}
                  className="border-2 w-[80px] h-[30px] rounded-lg"
                >
                  Log out
                </button>
              </div>
            </form>
          </div>

          {users.map((data) => (
            <div className="flex items-center w-[1280px] border-4 gap-5 mt-5">
              <input
                type="checkbox"
                value={data.id}
                ref={ref}
                onChange={(e: any) => {
                  const ischeked = e.target.checked;
                  if (ischeked) {
                    setUserIds((val: Array<any>) => [...val, data.id]);
                  } else {
                    setUserIds((val: Array<any>) =>
                      val.filter((item) => item.id === e.target.value)
                    );
                  }

                  setData(
                    users.map((item) => {
                      if (item.id === data.id) {
                        item.checked = ischeked;

                        console.log(e.target.value);
                      }
                      return item;
                    })
                  );
                }}
                checked={data.checked}
              />

              <Table {...data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
